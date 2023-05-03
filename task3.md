### Задание 3 - Volumes

```
user@scoffline:~/netology$ docker pull busybox:latest
latest: Pulling from library/busybox
4b35f584bb4f: Pull complete
Digest: sha256:b5d6fe0712636ceb7430189de28819e195e8966372edfc2d9409d79402a0dc16
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

user@scoffline:~/netology$ docker run -dit --name first_node -v $PWD/data:/var/first/data alpine
607feb312a67edcd8c765d908437ff253c193953673573818bd9100ac35af1ab

user@scoffline:~/netology$ docker run -dit --name second_node -v $PWD/data:/var/second/data alpine
ce81c1b90bd3e5b798c5eaf3aa2b80921607e1a5a8a9699fcca8d8e6fbb151da

user@scoffline:~/netology$ docker exec -it first_node /bin/sh
/ # vi /var/first/data/fileFromFirst.txt
/ # exit

user@scoffline:~/netology$ nano ./data/fileFromHostMachine.txt

user@scoffline:~/netology$ docker exec -it second_node /bin/sh
/ # ls /var/second/data/
fileFromFirst.txt        fileFromHostMachine.txt
/ # cat /var/second/data/fileFromFirst.txt
Some text from first node!
/ # cat /var/second/data/fileFromHostMachine.txt
Some text from host machine!!!
/ # exit

user@scoffline:~/netology$ docker stop first_node second_node
first_node
second_node
user@scoffline:~/netology$ docker container rm first_node second_node
first_node
second_node
user@scoffline:~/netology$ docker image rm alpine:latest
Untagged: alpine:latest
Untagged: alpine@sha256:124c7d2707904eea7431fffe91522a01e5a861a624ee31d03372cc1d138a3126
Deleted: sha256:9ed4aefc74f6792b5a804d1d146fe4b4a2299147b0f50eaf2b08435d7b38c27e

```