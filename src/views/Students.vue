<template>
  <div>
    <h3>Requests and request submission form</h3>

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
          <td v-if="isDecisionEmpty(strequest)" style="font-weight: bold;">Under processing</td>
          <td v-else>{{ strequest.decision }}</td>
          <td v-if="isDecisionJustificationEmpty(strequest)" style="font-weight: bold;">Under processing</td>
          <td v-else>{{ strequest.decisionjustification }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Students",
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
    isDecisionEmpty(strequest) {
      return strequest.decision == null || strequest.decision == "";
    },
    isDecisionJustificationEmpty(strequest) {
      return strequest.decisionjustification == null || strequest.decisionjustification == "";
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
</style>