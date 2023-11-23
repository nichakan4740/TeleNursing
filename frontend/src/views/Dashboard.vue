<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onBeforeMount, computed } from "vue";
import Layout from '../layouts/Layout.vue';
/* show */
const mysugar = ref([]);
onBeforeMount(async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/mysugar`,{
    method: "GET",
    mode: "cors",
   /*  headers: {
      'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    } */
  })
  if (res.status === 200) {
    mysugar.value = await res.json();
    console.log(mysugar.value);
  } else console.log("no event");

});

/* add */
const  sugarValue = ref("");
const  symptom = ref("");
const  note = ref("");
const save = async (sugarValue, symptom, note) => {
  // if (confirm("Please check you password") == true) {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/mysugar`, {
    method: "POST",
  /*   headers: {
      "content-type": "application/json",
    }, */
    body: JSON.stringify({
      sugarValue: sugarValue,
      symptom: symptom,
      note: note,
    }),
  });
  /* if (res.status === 200) {
    Swal.fire("DONE !!!", "You add user success!", "success");
    setTimeout(function () {
      close();
    }, 1500);
    console.log("You add user success");
  } else {
    console.log("error,cannot add");
    Swal.fire({
      icon: "error",
      title: "Sorry !!!",
      text: "Cannot add user!",
    });
  } */
  // }
};

/* export default {
  name: "Mysugar",
  data() {
    return {
      result: {},
      mysugar: {
        id: "",
        sugarValue: "",
        symptom: "",
        note: "",
        patientIdNumber: "",
      },
    };
  },
  created() {
    this.MysugarLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },

  methods: {
    MysugarLoad() {
      var page = `${import.meta.env.VITE_BASE_URL}api/mysugar`;
      axios.get(page).then(({ data }) => {
        console.log(data);
        this.result = data;
      });
    },


    save() {
      if (this.mysugar.id == "") {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    saveData() {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}api/mysugar`, this.mysugar)
        .then(({ data }) => {
          alert("saved");
          this.MysugarLoad();
          this.mysugar.sugarValue = "";
          (this.mysugar.symptom = ""), 
          (this.student.note = "");
          (this.student.patientIdNumber = "");
           this.id = "";
        });
    },


    edit(mysugar) {
      this.mysugar = mysugar;
    },
    updateData() {
      var editrecords = `${import.meta.env.VITE_BASE_URL}api/mysugar/` + this.mysugar.id;
      axios.put(editrecords, this.mysugar).then(({ data }) => {
         this.mysugar.sugarValue = "";
          (this.mysugar.symptom = ""), 
          (this.student.note = "");
          (this.student.patientIdNumber = "");
           this.id = "";
        alert("Updated!!!");
        this.MysugarLoad();
      });
    },

    
    remove(mysugar) {
      var url = `${import.meta.env.VITE_BASE_URL}api/mysugar/${mysugar.id}`;
      // var url = 'http://127.0.0.1:8000/api/student/'+ student.id;
      axios.delete(url);
      alert("Deleted");
      this.MysugarLoad();
    },
  },
};  */
</script>

<template>

 <Layout>
         <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>
             <div>
          <div class="row">
      <div class="col-md-4">
        <div class="card-header">Add Record</div>
        <div class="card-body">

          <form @submit.prevent="save">
            <div class="form-group">
              <label> SugarValue</label>
              <input
                type="text"
                v-model="mysugar.sugarValue"
                class="form-control"
                placeholder="Mysugar"
              />
            </div>

            <div class="form-group">
              <label>Symptom</label>
              <input
                type="text"
                v-model="mysugar.symptom"
                class="form-control"
                placeholder="Symptom"
              />
            </div>

            <div class="form-group">
              <label>Note</label>
              <input
                type="text"
                v-model="mysugar.note"
                class="form-control"
                placeholder="Note"
              />
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
  </div>




      <div class="col-md-8">
        <h2>Mysugar List</h2>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">SugarValue</th>
              <th scope="col">Symptom</th>
              <th scope="col">Note</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr   v-for="mysugars in mysugar" >
              <td>{{ mysugars.id }}</td>
              <td>{{ mysugars.sugarValue }}</td>
              <td>{{ mysugars.symptom}}</td>
              <td>{{ mysugars.note }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
    
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>  




            </div>
    </Layout>

   

</template>

