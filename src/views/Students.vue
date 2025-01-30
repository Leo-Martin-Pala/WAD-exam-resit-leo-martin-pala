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

  <h3  @click="showForm = !showForm">Submit a new request</h3>
  <div class="container" id="requestForm" v-if="showForm">
    <table>
      <thead>
      <tr>
        <th>Student code</th>
        <th>Course name</th>
        <th>Course code</th>
        <th>Student request</th>
      </tr>
      </thead>
      <tbody>
      <tr class="item">
        <td><input type="text" id="stcode" v-model="newrequest.stcode"></td>
        <td><input type="text" id="coursename" v-model="newrequest.coursename"></td>
        <td><input type="text" id="coursecode" v-model="newrequest.coursecode"></td>
        <td><input type="text" id="strequest" v-model="newrequest.strequest"></td>
      </tr>
      </tbody>
      <button @click="sendFormData" :disabled="isFormFilled">Submit</button>
    </table>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      strequests: [],
      newrequest: {
        stcode: "",
        coursename: "",
        coursecode: "",
        strequest: "",
      },
      showForm: false,
    };
  },
  computed: {
    isFormFilled(){
      return this.newrequest.stcode == "" || this.newrequest.coursename == "" || this.newrequest.coursecode == "" || this.newrequest.strequest == "";
    }
  },
  methods: {
    sendFormData() {
      console.log("clicked!!")
      fetch(`http://localhost:3000/api/submitrequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newrequest),
      })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    },
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

input {
  width: 80%;
  padding: 5px;
}
</style>