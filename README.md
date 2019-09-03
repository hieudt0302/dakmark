# dakmark

## Fix error renew certbot
> sudo certbot --authenticator standalone --installer nginx -d pokofarms.vn -d pokofarms.com.vn --pre-hook "service nginx stop" --post-hook "service nginx start"
