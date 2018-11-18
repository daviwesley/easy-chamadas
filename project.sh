#!/bin/sh

if [ "$1" = "lines" ] ; then
  echo "Python lines:"
  find api -name '*.py' | xargs wc -l
  echo
  echo "Javascript lines:"
  find app -name '*.js' | xargs wc -l
  echo
else
  echo "Command not found: $1"
fi
