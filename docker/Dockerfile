FROM node:lts

WORKDIR /root
COPY ./package.json .
RUN npm install vite --location=global
EXPOSE 3000
#RUN apt-get -y install sudo
#RUN echo "www-data:www-data" | chpasswd && adduser www-data sudo

# Install Composer
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#RUN echo "www-data ALL = NOPASSWD: /bin/service supervisor start, /bin/kill" | sudo tee -a /etc/sudoers
