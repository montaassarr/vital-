# Rapport Technique — Projet Big Data
## Analyse en Temps Réel des Ventes — Architecture Cloud/Kubernetes
### Réalisé seul, sur un seul PC (Ubuntu)

---

## 1. Contexte et Objectif

Le projet consiste à construire un pipeline complet de traitement de données de ventes, incluant :
- Le stockage distribué des données brutes
- Le nettoyage et la transformation via Apache Spark
- La modélisation en schéma en étoile (star schema)
- La persistance dans un métastore
- La visualisation des résultats

Le professeur a proposé deux chemins : l'architecture locale classique (Hadoop/YARN), ou l'architecture cloud/Kubernetes qui donne **un grand bonus**. J'ai choisi la deuxième.

---

## 2. Architecture Finale Choisie

```
[PC Ubuntu — un seul ordinateur]
│
├── Docker Desktop
│     └── Kubernetes (K8s intégré)
│           ├── Pod : spark-connect    (port 15002 → NodePort 30002)
│           ├── Pod : spark-thrift     (port 10000 → NodePort 30000)
│           └── Pod : postgres-metastore (port 5432 → NodePort 30432)
│
├── Jupyter Notebook (Python local)
│     └── Se connecte à Spark via sc://localhost:30002
│
└── [AWS Cloud — eu-west-3]
      └── S3 Bucket : bigdata-ventes-montassar
            ├── raw/sales.csv           (données brutes)
            └── warehouse/              (tables Spark en Parquet)
                  ├── dim_produits/
                  ├── dim_temps/
                  ├── dim_geo/
                  └── fact_ventes/
```

**Ce que chaque composant remplace :**

| Architecture classique (locale) | Architecture choisie (cloud/K8s) |
|---|---|
| Hadoop HDFS sur le PC | Amazon S3 (cloud AWS) |
| YARN cluster manager | Kubernetes (Docker Desktop) |
| PostgreSQL local | PostgreSQL dans un pod K8s |
| spark-submit --master yarn | Spark Connect (gRPC distant) |
| Power BI (Windows requis) | Plotly (HTML interactif, Python) |

---

## 3. Étapes de Réalisation

### Étape 1 — Génération du Dataset Synthétique

Création d'un script Python (`generate_csv.py`) qui génère **5 050 lignes** de transactions de ventes avec :
- 10 produits électroniques (Laptop Pro, Écran 4K, Clavier Mécanique, etc.)
- 5 régions françaises (Nord, Sud, Est, Ouest, Centre)
- 5 pays (France, Belgique, Suisse, Canada, Maroc)
- Dates réparties sur l'année 2024
- **50 doublons intentionnels** et **~100 valeurs nulles** (region) pour tester le nettoyage
- Prix avec variation ±15% autour des prix de base

Le CSV a été uploadé dans le bucket S3 :
```
s3://bigdata-ventes-montassar/raw/sales.csv
```

---

### Étape 2 — Infrastructure Kubernetes

Trois fichiers YAML ont été créés pour déployer toute l'infrastructure :

#### `postgres-k8s.yaml`
- Déploie PostgreSQL 15 dans K8s comme métastore Hive
- Crée un **PersistentVolumeClaim (PVC)** de 1 Go pour que les données survivent aux redémarrages de pods
- Credentials : `hiveuser / hivepassword / metastore`
- Accessible en NodePort 30432

#### `spark-connect-k8s.yaml`
- Déploie Apache Spark 3.5.3 en mode **Spark Connect** (serveur gRPC)
- Packages téléchargés au démarrage :
  - `spark-connect_2.12:3.5.3` — protocole Connect
  - `hadoop-aws:3.3.4` — connecteur S3A
  - `aws-java-sdk-bundle:1.12.262` — SDK AWS
- Configuration critique : `spark.sql.catalogImplementation=hive` (voir Problème #3)
- Les credentials AWS sont stockés en **K8s Secrets** (pas en clair dans le YAML)
- Un **ConfigMap** injecte le fichier `hive-site.xml` dans le pod

#### `spark-thrift-k8s.yaml`
- Même image Spark mais en mode **Thrift Server** (JDBC/HiveServer2)
- Permet des connexions SQL externes (Power BI, DBeaver, beeline)
- NodePort 30000
- Configuration `hive.server2.authentication=NONE` pour éviter les erreurs SASL

---

### Étape 3 — Script de Démarrage (`start_servers.sh`)

Script bash interactif qui :
1. Démarre PostgreSQL et attend que le pod soit `Running`
2. Demande à l'utilisateur le mode voulu : `connect` (notebook Python) ou `thrift` (SQL externe)
3. Démarre le pod correspondant et affiche l'URL de connexion

---

### Étape 4 — Notebook de Nettoyage (`cleaning_notebook.ipynb`)

Le notebook contient 7 cellules principales :

**Cellule 1 — Connexion Spark Connect**
```python
spark = SparkSession.builder.remote("sc://localhost:30002").getOrCreate()
```
La connexion est distante : le notebook Python local envoie des instructions au Spark tournant dans K8s. Tout le calcul se fait dans le pod, pas sur le PC directement.

**Cellule 2 — Chargement depuis S3**
- Lecture du CSV depuis `s3a://bigdata-ventes-montassar/raw/sales.csv`
- 5 050 lignes brutes

**Cellule 3 — Nettoyage**
- Suppression des doublons : `df.dropDuplicates()` → **50 lignes supprimées**
- Gestion des nulls : `dropna()` sur les colonnes critiques, `fillna("Inconnu")` pour région/pays
- Cast des types : quantite → Integer, prix_unitaire → Double, date → DateType
- Conversion de devises (USD→EUR ×0.92, GBP→EUR ×1.17, MAD→EUR ×0.093)
- Calcul du chiffre d'affaires : `quantite × prix_eur`
- **Résultat : 5 000 lignes propres**

**Cellule 4 — Schéma en Étoile**

```
          dim_produits          dim_temps
         (product_id, ...)     (time_id, annee, mois, ...)
                  \                 /
                   \               /
              fact_ventes (transaction_id, product_id,
                           time_id, geo_id, quantite,
                           prix_eur, chiffre_affaires)
                   /
                  /
            dim_geo
           (geo_id, region, pays)
```

**Cellule 5 — Persistance dans le Métastore**
- Nettoyage préalable des chemins S3 via boto3
- `DROP TABLE IF EXISTS` pour chaque table (évite les conflits)
- `saveAsTable()` → données en Parquet sur S3, métadonnées dans PostgreSQL
- Les 4 tables sont visibles via `SHOW TABLES`

**Cellules 6-7 — Analyses et Dashboard**
- Requêtes SQL via Spark : Top 10 produits, ventes par région, évolution mensuelle
- 3 graphiques interactifs Plotly sauvegardés en HTML :
  - Graphique 1 : Bar chart horizontal — Top 10 produits par CA
  - Graphique 2 : Carte choroplèthe mondiale — CA par pays
  - Graphique 3 : Courbe temporelle — Évolution mensuelle du CA

---

## 4. Problèmes Techniques Rencontrés et Solutions

### Problème 1 — PostgreSQL perd ses données au redémarrage du pod

**Symptôme :** Les tables du métastore disparaissaient à chaque redémarrage du pod PostgreSQL.

**Cause :** Par défaut, les pods Kubernetes sont éphémères. Sans volume persistant, toutes les données écrites dans le conteneur sont perdues à l'arrêt.

**Solution :** Ajout d'un `PersistentVolumeClaim` (PVC) de 1 Go dans `postgres-k8s.yaml`. Le PVC est un volume monté sur `/var/lib/postgresql/data` qui survit aux cycles de vie des pods.

---

### Problème 2 — Spark Connect utilise Derby (mémoire) au lieu de PostgreSQL

**Symptôme :** `SHOW TABLES` retournait les 4 tables après `saveAsTable`, mais en vérifiant directement dans PostgreSQL, la table `TBLS` était vide. Les tables disparaissaient à chaque redémarrage du pod Spark.

**Cause :** C'est le bug le plus critique du projet. Spark a deux implémentations de catalogue :
- `in-memory` (défaut) : catalogue Derby en mémoire, perdu au redémarrage
- `hive` : catalogue Hive persisté dans PostgreSQL

Même en fournissant un fichier `hive-site.xml` correct pointant vers PostgreSQL, Spark n'utilise pas Hive si `spark.sql.catalogImplementation` n'est pas explicitement mis à `hive`.

**Solution :** Ajout de `--conf spark.sql.catalogImplementation=hive` dans la commande de démarrage du pod Spark Connect.

```yaml
--conf spark.sql.catalogImplementation=hive
```

---

### Problème 3 — `LOCATION_ALREADY_EXISTS` lors de `saveAsTable`

**Symptôme :**
```
SparkRuntimeException: [LOCATION_ALREADY_EXISTS] Cannot name the managed table
`spark_catalog`.`default`.`dim_produits`, as its associated location
's3a://bigdata-ventes-montassar/warehouse/dim_produits' already exists.
```

**Cause :** `saveAsTable` crée une table managée. Si le chemin S3 existe déjà (d'une exécution précédente) mais que la table n'existe plus dans le métastore (pod redémarré), Spark refuse de créer la table par sécurité.

**Solution en deux étapes :**
1. `DROP TABLE IF EXISTS <table>` avant chaque `saveAsTable` — nettoie le métastore
2. Nettoyage des chemins S3 via boto3 avant l'écriture — supprime les fichiers Parquet résiduels

---

### Problème 4 — `Cannot modify the value of a static config: spark.sql.warehouse.dir`

**Symptôme :** `AnalysisException` au moment de `spark.conf.set("spark.sql.warehouse.dir", ...)`.

**Cause :** `spark.sql.warehouse.dir` est une configuration statique de Spark — elle ne peut être définie qu'au démarrage du serveur, pas à l'exécution depuis un client Connect.

**Solution :** Supprimer cette ligne du notebook. Le `warehouse.dir` est déjà configuré côté serveur dans le YAML : `--conf spark.sql.warehouse.dir=s3a://bigdata-ventes-montassar/warehouse`.

---

### Problème 5 — Le jar JDBC PostgreSQL manquant dans le pod Spark

**Symptôme :** Au démarrage, Spark Connect ne pouvait pas se connecter à PostgreSQL car le driver JDBC n'était pas dans `/opt/spark/jars/`.

**Cause :** L'image `apache/spark:3.5.3` n'inclut pas le jar PostgreSQL par défaut.

**Solution :** Le script de démarrage du pod télécharge le jar automatiquement :
```bash
curl -sL https://jdbc.postgresql.org/download/postgresql-42.7.1.jar -o /opt/spark/jars/postgresql-42.7.1.jar
```

---

### Problème 6 — Mémoire insuffisante pour deux pods Spark simultanés

**Symptôme :** Le pod Spark Thrift Server restait en `Pending` avec `0/1 nodes are available: 1 Insufficient memory`.

**Cause :** Spark Connect demande 2 Go de RAM. Spark Thrift demande 1,5 Go. Total : 3,5 Go — dépasse la RAM disponible pour K8s sur un seul PC.

**Solution :** Ne pas faire tourner les deux pods en même temps. Le script `start_servers.sh` propose de choisir l'un ou l'autre. Pour passer de Connect (notebook) à Thrift (SQL), on scale l'un à 0 avant de lancer l'autre :
```bash
kubectl scale deployment spark-connect --replicas=0
kubectl apply -f spark-thrift-k8s.yaml
```

---

### Problème 7 — VS Code conserve en cache l'ancien contenu des cellules

**Symptôme :** Après modification du fichier `.ipynb` sur disque, VS Code continuait à exécuter l'ancienne version de la cellule.

**Cause :** Le noyau Jupyter de VS Code charge le contenu des cellules en mémoire à l'ouverture du fichier. Les modifications sur disque ne sont pas rechargées automatiquement.

**Solution :** Fermer et rouvrir le notebook dans VS Code pour forcer le rechargement.

---

### Problème 8 — Power BI non disponible (pas de Windows)

**Symptôme :** Le projet recommande Power BI, qui ne fonctionne que sur Windows.

**Solution :** Remplacement par **Plotly** (bibliothèque Python) qui génère des graphiques interactifs équivalents en HTML. Les 3 visualisations produites sont :
- Top 10 produits (bar chart horizontal avec valeurs)
- Carte mondiale des ventes par pays (choroplèthe)
- Évolution mensuelle du CA (courbe avec marqueurs)

---

## 5. Ce qui Justifie le Bonus

| Critère bonus | Réalisation |
|---|---|
| **AWS S3 remplace HDFS** | Bucket `bigdata-ventes-montassar` en région eu-west-3. Toutes les données (raw + warehouse) sont dans le cloud. |
| **Kubernetes remplace YARN** | Docker Desktop K8s orchestre les pods Spark et PostgreSQL. |
| **Architecture conteneurisée** | Tout le stack est reproductible via 3 fichiers YAML. |
| **PC non surchargé** | Pas d'installation Hadoop locale. Le PC fait tourner uniquement Docker. |
| **Mêmes livrables** | Script de démarrage, notebook de nettoyage, visualisations — mais cloud-native. |

---

## 6. Résultats Obtenus

| Métrique | Valeur |
|---|---|
| Lignes brutes | 5 050 |
| Doublons supprimés | 50 |
| Lignes après nettoyage | 5 000 |
| Tables créées | 4 (dim_produits, dim_temps, dim_geo, fact_ventes) |
| Produits distincts | 10 |
| Dates distinctes | 336 |
| Couples région/pays distincts | 6 |
| Données stockées dans | S3 (Parquet) + PostgreSQL (métadonnées) |
| Visualisations | 3 graphiques HTML interactifs |

---

## 7. Fichiers Livrables

| Fichier | Description |
|---|---|
| `generate_csv.py` | Script de génération du dataset synthétique |
| `start_servers.sh` | Script de démarrage de l'infrastructure K8s |
| `cleaning_notebook.ipynb` | Notebook PySpark complet (nettoyage + star schema + dashboard) |
| `k8s/postgres-k8s.yaml` | Déploiement PostgreSQL avec PVC |
| `k8s/spark-connect-k8s.yaml` | Déploiement Spark Connect (mode notebook) |
| `k8s/spark-thrift-k8s.yaml` | Déploiement Spark Thrift Server (mode SQL) |

---

## 8. Difficultés Spécifiques au Travail Seul sur Un Seul PC

Travailler seul sur un seul ordinateur a imposé des contraintes importantes :

1. **Contrainte mémoire** : K8s, Spark (2 Go), PostgreSQL, et le notebook Python tournaient tous sur la même machine. Impossible de faire tourner Connect et Thrift simultanément.

2. **Pas de séparation des rôles** : Dans un vrai projet d'entreprise, l'infrastructure K8s serait gérée par une équipe DevOps. Ici, tout — infrastructure, données, code, débogage — a été fait par une seule personne.

3. **Débogage complexe** : Le débogage d'un pod Kubernetes nécessite de jongler entre `kubectl logs`, `kubectl exec`, les logs Spark, et le notebook Python en parallèle.

4. **Pas de Windows pour Power BI** : Résolu avec Plotly, qui produit des visualisations de qualité professionnelle en HTML.

5. **Gestion des redémarrages** : Docker Desktop K8s peut s'arrêter accidentellement. Tout a été conçu pour être relancé rapidement avec un seul script.

---

*Rapport généré le 24 mai 2026.*
