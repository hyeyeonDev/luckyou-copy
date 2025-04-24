FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y curl docker.io \
    && curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose \
    # && groupadd -g 62 docker || true \
    && groupmod -g 122 docker \
    && usermod -aG docker jenkins
USER jenkins
