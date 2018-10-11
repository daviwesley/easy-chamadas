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

**Passos para a execução do Aplicativo**

* Instale o NodeJS
* instale a ferramenta Expo, execute na linha de comando <code>npm install expo-cli --global</code>
* dentro da pasta `easy-chamadas/app` execute o seguinte comando <code>expo start</code>
* escolha o dispositivo de sua preferência emuladou ou smartphone, ambas as escolhas precisam do app Expo<br>
instalado. <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR">Android</a> | <a href="https://itunes.apple.com/us/app/expo-client/id982107779?mt=8">iOS</a>
