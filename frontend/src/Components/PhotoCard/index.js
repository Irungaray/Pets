import React, { useEffect, useRef, useState } from 'react';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { Article, ImgWrapper, Img, Button } from './styles';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {

  const ref = useRef(null);
  const [show, setShow] = useState(false);

  const key = `like-${id}`
  const [liked, setLiked] = useState(() => {
    try {
      const like = window.localStorage.getItem(key);
      return like;
    } catch (err) {
      return false;
    }
  });

// console.log(liked)

  useEffect(function () {
    const observer = new window.IntersectionObserver(
      function (entries) {
        const { isIntersecting } = entries[0]

        if (isIntersecting) {
          // console.log('Intersecting')
          setShow(true)
          observer.disconnect()
        }
      }
    )

    observer.observe(ref.current)
  }, [ref])

  const Icon = liked ? MdFavorite : MdFavoriteBorder;

  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, value)
      setLiked(value)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Article ref={ref}>
      {
        show &&
        <>
          <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>

          <Button onClick={() => setLocalStorage(!liked)}>
            <Icon size='32px' /> {likes} likes
          </Button>
        </>
      }
    </Article>
  )
}
