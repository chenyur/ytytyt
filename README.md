## Repeats youtube audio

Live at http://youtubeyoutubeyoutube.com

#To run

```
docker build -t (your tag) .
docker run -p 8081:8081 -dit --rm (your tag)
```

I use [OptimalBits/redbird](https://github.com/OptimalBits/redbird) for reverse proxy.

- [x] Basic function with a full URL input
- [x] Repeats current song
- [x] Song search with youtube API
- [x] Update search box with current song name
- [ ] Switch background to song's album cover

Further down the road..

- [ ] A playlist
- [ ] Cookie the playlist
- [ ] Cache songs in a NoSQL database
- [ ] A login system
