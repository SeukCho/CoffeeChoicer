# CoffeeChoicer

 # ~~[바로가기]~~

 ## 웹 순서도
 
  main : Login / Ranking / Random
  
  Login : 학번 / 비밀번호 기반 -> anonymous로 사용 가능 // connected to main, ranking, random as button
  
  Ranking : 1회 이상 선택된 음료들을 많이 선택된 순으로 sort 해서 표시. connected to login, random as button
  
  Random : 음료중 하나 랜덤 선택. 옵션으로 Ice 지정 가능(Button or CheckBox) 
  
  > 선택시 그 계정에 한정하여  가중치 적용, 다음 뽑기에서 나올 확률이 늘어남. Ranking에 가중치가 전송됨
 

---

# 4주차

> 목적 : 로그인 기능 구현

mysql 에 crypto 등의 기능을 붙여서 안전 로그인 패킷을 구현하려고 했지만 시간을 많이 들였음에도 구현하기 어려웠음

차주 시간을 좀 더 들여서 구현하거나, 로그인에서 비밀번호를 빼고 구현하도록 선회 고민중.

시간에 따라 random 기능 부분 구현을 우선시.

---

# 5주차

시행착오가 많아 파일(커밋)에 직접 변화 없음. 작업 후 처음부터 하고를 많이 반복함

몸상태가 안좋아서 시간투자가 적었음(약 3시간 미만)



---

# 6주차

12/15 발표
pc에 서버를 띄우던지
인터넷에 서버를 띄우던지
노트북에 서버를 띄우고 pc에서 연결하던지

자신의 pc에서 접속이 되는지
(lte 환경 스마트폰에서 접속이 되는지)

구현 발표만.

실제 발표 : 홈페이지 접속 -> 로그인 -> 기능 설명
12/18 최종 프로젝트 완료 보고서(일부 발표용 ppt 슬라이드
삽입), 발표용 ppt(발표에서 쓰진 않지만, 한다고 생각하고
만들것)

Function Cost 기능점수 계산해서 넣기?
설계. 구현 화면 캡쳐. 중요 코드 일부 설명.
나머지 코드는 github.

팀 프로젝트에 깃허브 주소 꼭 써둘 것. 서버가 외부에 구현이
되어있다면 서버 주소도.

---

# 7주차

git repository cleanup. 

mysql - 웹 연결을 최우선시해, 특히 유저 id와 coffee_id, count 의 query 형태 구현에 집중

mysql insert 과정에서 database를 잘못 지정해 오류 발생, 시간이 다소 소요됨.

```mysql

CREATE TABLE IF NOT EXISTS coffees (
  userid int(12) NOT NULL,
  coffeeid int(12) NOT NULL
);

INSERT INTO coffees (userid, coffeeid) VALUES ('1', '13'),
('1', '13'),
('1', '13'),
('1', '13'),
('2', '4'),
('2', '13'),
('2', '11'),
('1', '15'),
('1', '23')
;

```

와 같은 형태로 테이블을 생성

```mysql
select coffeeid from coffees where userid = 1;
```
으로 userid 1 인 사람의 커피목록(13,13,13,,13,15,23)을 받아올 수 있음

```mysql
select count(*) from coffees where userid = 1;
```
으로 userid 1 인 사람의 총 쿼리 횟수를 불러올 수 있음.

12/07, 12/12, 12/14 많은 시간을 투자해 SQL 불러오기 및 랜덤룰렛에 적용까지 완료함.
