# easy-chamadas
[![Build Status](https://travis-ci.org/daviwesley/easy-chamadas.svg?branch=master)](https://travis-ci.org/daviwesley/easy-chamadas)
</br>
Aplicativo para realizar chamadas de alunos

**Passos para a instalação do servidor**

* Instale o python3.7
* Instale o pip(ferramenta de instalação de pacotes do python)
* Instale o git <code>sudo apt-get install git</code>
* no terminal execute <code>pip install virtualenvwrapper</code>
* no terminal execute o comando <code>mkvirtualenv env --python=python3</code>
* no terminal excecute o comando <code>git clone https://github.com/daviwesley/easy-chamadas.git</code>
* depois <code>cd easy-chamadas/api</code>
* <code>pip install -r requeriments.txt</code>
* <code>pyton manage.py migrate</code>
* opcionalmente podes criar um admin com o seguinte comando <code>python manage.py createsuperuser</code>
