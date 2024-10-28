Nestjs프로젝트 근데 이제 JWT 인증 연습을 곁들인.

https://develop-const.tistory.com/3 이분의 블로그를 참고하였다. 압도적 감사!

nestjs 라이프사이클 흐름 순서

1. Request

2. middleware ( 미들웨어 )

3. guards ( 가드 )
   주로 permission ( 인증 ) 처리를 할 때 사용

4. pre-interceptors ( 인터셉터 )
   주로 post-interceptor를 위한 변수 선언, 함수 실행 ( optional )

5. Pipes ( 파이프 )
   변환( 요청 바디를 원하는 형식으로 변환 ), 유효성 검사

6. Controller ( 컨트롤러 )
   라우터 역할을 수행

7. Service ( 서비스 )
   해당 요청에 대한 핵심 로직이 수행

8. post-interceptor ( 인터셉터 )
   주로 pre-interceptor 로직을 가지고 응답한 데이터를 가공하거나 전체 로직의 속도 측정. 최종적으로 성공적인 응답 데이터를 보냄

9. exception filters ( 필터 )
   예외 처리를 담당. 에러 메세지를 원하는 형태로 가공해서 응답

10. Response
