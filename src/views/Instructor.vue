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
          <th>Decision justification</th>
        </tr>
        </thead>
        <tbody>
        <tr class="item" v-for="strequest in strequests" :key="strequest.id">
          <td>{{ strequest.studentcode }}</td>
          <td>{{ strequest.coursename }}</td>
          <td>{{ strequest.coursecode }}</td>
          <td>{{ strequest.studentrequest }}</td>
          <td><input type="text" id="decision" v-model="decision"></td>
          <td><input type="text" id="decision-justification" v-model="decisionJustification"></td>
          <td>
            <button class="descision" @click="decide">Descision</button>
          </td>
        </tr>
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
      decision: "",
      decisionJustification: "",
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/requests`)
          .then((response) => response.json())
          .then((data) => (this.strequests = data))
          .catch((err) => console.log(err.message));
    },
    decide() {
      console.log("clicked!!");
      fetch(`http://localhost:3000/api/decide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.strequests[0]),
      })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
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

table tr {
  background-color: grey;
}

table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: yellowgreen;
}

input {
  width: 80%;
  padding: 5px;
}
</style>