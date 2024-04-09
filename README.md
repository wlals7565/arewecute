# 프로젝트 소개
- 한 줄 소개: 펫시터 매칭 서비스로 펫시터를 매칭하여 예약하고 리뷰를 남길 수 있다.
- 배경: 펫시터 매칭 서비스를 만들면서 API서버를 만드는 것과 웹페이지가 Axios를 통해 API서버와 상호작용하게 만드는 법을 배우고자 함.
- 참여인원: 4명
- 본인의 역할: API작성 및 에러 핸들링, 프론트에서 axios를 이용한 API서버와의 통신.
- 진행기간: 7일

# 기술 스택
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
- ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
- ![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)

# 프로젝트 과정 소개
<table>
<thead>
<tr>
<th align="left"><strong>주요 작업</strong></th>
<th align="left"><strong>작업 상세 설명</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">API 설계 및 구현</td>
<td align="left">
  <ul>
    <li>
      API를 컨트롤러, 서비스, 레포지터리 3계층으로 분리하여 설계한 뒤 각 기능들을 주제별로 분리하여 팀원끼리 분배하여 구현.
    </li>
    <li>
      웹페이지를 담당한 팀원이 API에 대한 인터페이스 설명을 필요로 했기에 간단한 API 설명서 작성
    </li>
    <li>
      [API 명세서](https://teamsparta.notion.site/7-20585a4f64f9489b834f34f2e5e44b1f)
    </li>
  </ul>
  </td>
</tr>
  <tr>
<td align="left">Axios를 통해 웹페이지와 API서버 통신 로직 작성 및 에러핸들링</td>
<td align="left">
  <ul>
    <li>
      웹페이지의 Axios 통신 설정 및 에러 핸들링
    </li>
    <li>
      API를 통해 요청을 보낼때 잘못된 요청에 대한 처리가 필요해 보였음.
    </li>
    <li>
      이에 따라 각 API로직에 에러 핸들링을 추가함.
    </li>
  </ul>
  </td>
</tr>
   <tr>
<td align="left">EC2를 이용한 배포</td>
<td align="left">
  <ul>
    <li>
      EC2를 통해 서버를 배포하였으며 작동을 확인.
    </li>
  </ul>
  </td>
</tr>
</tbody>
</table>

# 영상 링크
- [결과 영상링크](https://www.youtube.com/watch?v=trHbHBRSYMM)

# 프로젝트 회고
- 해당 프로젝트에서 컨트롤러, 서비스, 레포지터리로 3계층으로 분리하여 프로젝트를 설계하고 만들었는데 이것이 코드의 가독성과 수정을 쉽게 만들어 주었음.
- 시간이 부족해 Swagger문서를 제대로 만들지 못함. 이 부분이 아쉬움
- Sequelize에 대한 이해 부족으로 시간을 많이 끌었던 것 같다. Sequelize에 대한 공부가 필요해 보인다.
