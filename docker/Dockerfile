FROM nginx
COPY dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN apt update && apt install -y curl

HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost/ || exit 1