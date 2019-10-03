# nuxt-element-admin
- Nuxt.js + typescript + vue-property-decorator + elementUI

## Build Setup
런타임시에 nuxt가 아닌 nuxt-ts를 사용
``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## basic
- 백오피스에 주로 사용하는 대시보드형 레이아웃
- 리모트 table + filter

## ps
```
- vue프로젝트가 방대해지면 type safe 하지 않은 데이터의 이동이 많아진다.
- 또 객체를 무수히 많이 정의해두지만 추후 코드를 봤을 때 이게 어떤 객체였는지 확인하는데 시간이 많이 든다.
- 이를 보완하기 위해 vue에 ts 도입을 하게 되었고 더 나아가 Nuxt까지 적용해보았다.
```