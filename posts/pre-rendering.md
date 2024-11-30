---
title: "Data Fetching"
date: "2024-12-01"
---

# Next JS에서 데이터를 가져오는 방법

## getStaticProps

- Static Generation으로 빌드(build)할 때 데이터를 불러옵니다.(미리 만들어줌)
- getStaticProps 함수를 async로 export 하면, getStaticProps에서 리턴되는 props를 가지고 페이지를 pre-render 합니다.
- build time에 페이지를 렌더링 합니다.
- getStaticProps를 사용해야 할 때
  - 페이지를 렌더링하는 데 필요한 데이터는 사용자의 요청보다 먼저 build 시간에 필요한 데이터를 가져올 때
  - 데이터는 Headless CMS에서 데이터를 가져올 때.
  - 데이터를 공개적으로 캐시할 수 있을 때(사용자별 아님).
  - 페이지는 미리 렌더링되어야 하고(SEO의 경우) 매우 빨라할 때.(getStaticProps는 성능을 위해 CDN에서 캐시할 수 있는 HTML 및 JSON 파일을 생성합니다.)

## getStaticPaths

- Static Generation으로 데이터에 기반하여 pre-render시 특정한 동적 라우팅 구현(pages/post/[id].js)
- 동적 라우팅이 필요할 때 getStaticPaths로 경로 리스트를 정의하고, HTML에 build 시간에 렌더 됩니다.
- Nextjs는 pre-render에서 정적으로 getStaticPaths 에서 호출하는 경로들을 가져옵니다.

### paths

- 어떠한 경로가 pre-render 될지를 결정합니다.
- 만약 pages/posts/[id].js 이라는 이름의 동적 라우팅을 사용하는 페이지가 있다면 아래와 같이 됩니다.

```
return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ],
  fallback: ...
}
```

- 빌드하는 동안 /posts/1과 /posts/2를 생성하게 됩니다.

### params

- 페이지 이름이 pages/posts/[postId]/[commentId] 라면 , params은 postId와 commentId입니다.
- 만약 페이지 이름이 pages/[...slug] 와 같이 모든 경로를 사용한다면, params는 slug가 담긴 배열이어야한다. ['postId', 'commentId']

### fallback

- false 라면 getStaticPaths로 리턴되지 않는 것은 모두 404 페이지가 뜹니다.
- true 라면 getStaticPaths로 리턴되지 않는 것은 404로 뜨지 않고 , fallback 페이지가 뜨게 됩니다.

## getServerSideProps

- Server Side Rendering으로 요청이 있을 때 데이터를 불러옵니다.
- getServerSideProps 함수를 async로 export 하면, Next는 각 요청마다 리턴되는 데이터를 getServerSideProps로 pre-render합니다.
- getServerSideProps를 사용해야 할 때
  - 요청할 때 데이터를 가져와야하는 페이지를 미리 렌더해야 할 때 사용합니다. 서버가 모든 요청에 대한 결과를 계산하고, 추가 구성없이 CDN에 의해 결과를 캐시할 수 없기 때문에 첫번째 바이트까지의 시간은 getStaticProps보다 느립니다.
