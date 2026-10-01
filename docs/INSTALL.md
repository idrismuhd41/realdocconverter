# Local install (Ubuntu 22.04, WSL 2)

## 1. System packages

    sudo apt update
    sudo apt install -y curl ca-certificates gnupg lsb-release \
      postgresql postgresql-contrib redis-server \
      libreoffice ghostscript poppler-utils qpdf \
      tesseract-ocr tesseract-ocr-eng \
      unzip zip build-essential

## 2. Node.js 20

    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    node -v   # must be v20.x

## 3. Services

    sudo systemctl enable --now postgresql redis-server

## 4. Database

    sudo -u postgres psql <<'SQL'
    CREATE USER docuconvert WITH PASSWORD 'docuconvert_dev_pw';
    CREATE DATABASE docuconvert OWNER docuconvert;
    GRANT ALL PRIVILEGES ON DATABASE docuconvert TO docuconvert;
    SQL

## 5. Project

    cd /var/realdocconverter
    cp .env.example .env
    npm install
    npm run dev

Then open http://localhost:3000