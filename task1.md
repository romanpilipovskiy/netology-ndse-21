### Задание 1 - Docker CLI

```
user@scoffline:~/netology$ docker pull busybox:latest
latest: Pulling from library/busybox
4b35f584bb4f: Pull complete
Digest: sha256:b5d6fe0712636ceb7430189de28819e195e8966372edfc2d9409d79402a0dc16
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

user@scoffline:~/netology$ docker run -d --name pinger busybox:latest ping -c 7 netology.ru
b12ec19d0f431fe49d94401b41af4469e4693e8e93e2c338ff5f6ba438982fc0

user@scoffline:~/netology$ docker ps -a
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS                              PORTS     NAMES
b12ec19d0f43   busybox:latest   "ping -c 7 netology.…"   7 seconds ago   Exited (0) Less than a second ago             pinger

user@scoffline:~/netology$ docker logs pinger
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=56 time=47.407 ms
64 bytes from 188.114.98.224: seq=1 ttl=56 time=47.517 ms
64 bytes from 188.114.98.224: seq=2 ttl=56 time=47.058 ms
64 bytes from 188.114.98.224: seq=3 ttl=56 time=47.224 ms
64 bytes from 188.114.98.224: seq=4 ttl=56 time=47.215 ms
64 bytes from 188.114.98.224: seq=5 ttl=56 time=47.285 ms
64 bytes from 188.114.98.224: seq=6 ttl=56 time=47.321 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 47.058/47.289/47.517 ms

user@scoffline:~/netology$ docker start pinger
pinger

user@scoffline:~/netology$ docker ps -a
CONTAINER ID   IMAGE            COMMAND                  CREATED              STATUS                    PORTS     NAMES
b12ec19d0f43   busybox:latest   "ping -c 7 netology.…"   About a minute ago   Exited (0) 1 second ago             pinger

user@scoffline:~/netology$ docker logs pinger
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=56 time=47.407 ms
64 bytes from 188.114.98.224: seq=1 ttl=56 time=47.517 ms
64 bytes from 188.114.98.224: seq=2 ttl=56 time=47.058 ms
64 bytes from 188.114.98.224: seq=3 ttl=56 time=47.224 ms
64 bytes from 188.114.98.224: seq=4 ttl=56 time=47.215 ms
64 bytes from 188.114.98.224: seq=5 ttl=56 time=47.285 ms
64 bytes from 188.114.98.224: seq=6 ttl=56 time=47.321 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 47.058/47.289/47.517 ms
PING netology.ru (188.114.99.224): 56 data bytes
64 bytes from 188.114.99.224: seq=0 ttl=56 time=47.501 ms
64 bytes from 188.114.99.224: seq=1 ttl=56 time=46.937 ms
64 bytes from 188.114.99.224: seq=2 ttl=56 time=47.326 ms
64 bytes from 188.114.99.224: seq=3 ttl=56 time=47.050 ms
64 bytes from 188.114.99.224: seq=4 ttl=56 time=47.110 ms
64 bytes from 188.114.99.224: seq=5 ttl=56 time=47.309 ms
64 bytes from 188.114.99.224: seq=6 ttl=56 time=47.043 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 46.937/47.182/47.501 ms
```
Запусков ping - 2
ICMP запросов - 14

```
user@scoffline:~/netology$ docker container rm pinger
pinger

user@scoffline:~/netology$ docker image rm busybox:latest
Untagged: busybox:latest
Untagged: busybox@sha256:b5d6fe0712636ceb7430189de28819e195e8966372edfc2d9409d79402a0dc16
Deleted: sha256:7cfbbec8963d8f13e6c70416d6592e1cc10f47a348131290a55d43c3acab3fb9
Deleted: sha256:baacf561cfff825708763ce7ee4a18293716c533e6ece3bd39009a5fb3c804d2

```