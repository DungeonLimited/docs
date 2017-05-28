# bnomad

> offline order taking tool

## Build Setup

### install dependencies
``` bash
npm install
```

### Dev with hot reload at localhost:8080
``` bash
npm run dev
```

### Build with service worker (test and debug) 
``` bash
npm run build
```

### Production ready
``` bash
npm run prod
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Testing Service worker on phone

As service worker only starts with local server address (locahost, 127.\*.\*.\*) or expects the connection ti be secured (https), we need to simulate server on local for the phone.

1. Connects phone to computer via USB (activates debug + files transfer)
1. Generates a port forwading (ex : localhost:8081->127.0.0.12:80)

## Example of Apache2 configuration

```Apache
<VirtualHost *:80>
	ServerAdmin webmaster@localhost
	ServerName framework
	ServerAlias 127.0.0.1

	#AddType application/x-httpd-php .php
		
	DocumentRoot /home/thomas/PhpstormProjects/bappli/framework/
	<Directory /home/thomas/PhpstormProjects/bappli/framework/>
		Options Indexes FollowSymLinks MultiViews
		AllowOverride All
		Require all granted    
	</Directory>

	Alias "/build-bnomad" "/home/thomas/PhpstormProjects/bappli/bnomad/dist"
	<Directory /home/thomas/PhpstormProjects/bappli/bnomad/dist>
		AllowOverride All
		Require all granted
	</Directory>
	
	<Location "/dev-bnomad/">
		ProxyPass "http://localhost:8080/"
		ProxyPassReverse "http://localhost:8080/"
	</Location>

	ErrorLog /var/log/apache2/framework-error.log 

	# Possible values include: debug, info, notice, warn, error, crit,
	# alert, emerg.
	LogLevel warn

	CustomLog /var/log/apache2/framework-access.log combined
</VirtualHost>
```

### Add apache module

```bash
a2enmod proxy
a2enmod proxy_http
```