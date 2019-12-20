environment "development"
daemonize true
pidfile '/var/www/liam_and_lisa_open.mikerockall.com/puma.pid'
stdout_redirect '/var/www/liam_and_lisa_open.mikerockall.com/log/puma.log'
threads 1,5
bind "unix:///var/www/liam_and_lisa_open.mikerockall.com/app.sock"