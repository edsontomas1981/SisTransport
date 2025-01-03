#!/bin/bash

# Caminho para o diretório do projeto
PROJECT_DIR="/home/edson/Documentos/SisTransports"

# Caminho para o backend onde está o projeto Django
BACKEND_DIR="$PROJECT_DIR/SisTransports"

# Inclua o diretório raiz no PYTHONPATH
export PYTHONPATH=$PROJECT_DIR

# Navegue até o diretório do ambiente virtual
cd $PROJECT_DIR || exit

# Ative o ambiente virtual
source venv/bin/activate

# Navegue até a pasta do backend
cd $BACKEND_DIR || exit

# Execute o servidor Django com parâmetros específicos
python manage.py runserver 0.0.0.0:8000

# Pausa para visualizar mensagens
echo "Pressione qualquer tecla para sair..."
read -n1 -s

