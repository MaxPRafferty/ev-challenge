#!/usr/bin/env bash

sed -i -e 's/href="/href="\/ev-challenge/g' docs/index.html
sed -i -e 's/src="/src="\/ev-challenge/g' docs/index.html
rm docs/index.html-e
