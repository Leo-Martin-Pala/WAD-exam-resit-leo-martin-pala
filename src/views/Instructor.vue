<template>
  <div>
  <h1>Requests Management Pannel</h1>
  <div class="container">
    <table>
      <thead> 
          <tr> 
            <th>St. Code</th>
            <th>Course name</th>
            <th>Course code</th>
            <th>St. request</th>
            <th>Decision</th>
            <th>Decision jusification</th>
          </tr>
      </thead> 
      <tbody> 

      </tbody> 
    </table>
  </div>
</div>
</template>


<script>
export default {
  name: "Instructor",
  data() {
    return {
      strequests: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/requests`)
        .then((response) => response.json())
        .then((data) => (this.strequests = data))
        .catch((err) => console.log(err.message));
  },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
}
</style>