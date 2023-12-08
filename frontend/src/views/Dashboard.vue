<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import Layout from '../layouts/Layout.vue';
import moment from "moment";
import Swal from "sweetalert2";

/* date-time */
const selectedDate = ref('');
const resultdate = ref('');

const getDateDetails = () => {
  if (selectedDate.value !== '') {
    const date = new Date(selectedDate.value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const weekDayIndex = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[weekDayIndex];

    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthsOfYear[date.getMonth()];

    resultdate.value = `วันที่: ${day} เดือน: ${month} ปี: ${year} วัน: ${dayOfWeek}<br> เดือน: ${monthName}`;
  }
};



const result = ref([]);
const mysugar = ref({
  id: '',
  sugarValue: '',
  symptom: '',
  note: '',
});

const MysugarLoad = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/mysugar`);
    const data = await response.json();
    result.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const save = async () => {
  if (mysugar.value.id === '') {
    await saveData();
  } else {
    await updateData();
  }
};


const saveData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/mysugar`,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mysugar.value),
    });
    if (response.ok) {
      alert('Saved');
      await MysugarLoad();
      mysugar.value.id = '';
      mysugar.value.sugarValue = '';
      mysugar.value.symptom = '';
      mysugar.value.note = '';
     
    } else {
      throw new Error('Failed to save');
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const edit = (record) => {
  mysugar.value = { ...record };
};

const updateData = async () => {
  try {
    const editrecords = `${import.meta.env.VITE_BASE_URL}api/mysugar/${mysugar.value.id}`;
    const response = await fetch(editrecords, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mysugar.value),
    });

    if (response.ok) {
      alert('Updated!!!');
      await MysugarLoad();
      // Reset fields
      mysugar.value.sugarValue = '';
      mysugar.value.symptom = '';
      mysugar.value.note = '';
      mysugar.value.id = '';
    } else {
      // Handle different HTTP error statuses
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 401) {
        throw new Error('Unauthorized');
      } else {
        throw new Error('Failed to update');
      }
    }
  } catch (error) {
    console.error('Error updating data:', error.message);
    // You can display an error message to the user here if needed
  }
};




/* ลบ */
const remove = async (record) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}api/mysugar/${record.id}`;

    // Display confirmation dialog using Swal
    const confirmationResult = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmationResult.isConfirmed) {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        // Show success message using Swal if deletion is successful
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
        // Call MysugarLoad function after successful deletion
        await MysugarLoad();
      } else {
        throw new Error('Failed to delete');
      }
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
// Assuming MysugarLoad function is defined somewhere in your code
MysugarLoad();
</script>

<template>
 <Layout class="bg-gradient-to-b  from-blue-100 " >
       
<!-- content -->

<div class="container mx-auto">
 <div  class="box-content p-3  ml-5 mr-5 mt-10 bg-gradient-to-b from-blue-900 to-blue-800  shadow-lg shadow-slate-500/50  rounded-lg">
            <h2 class="font-semibold text-xl text-center text-slate-200 ">สถิติ</h2>
    </div>

<div class="grid grid-cols-2 gap-2  mt-5  ">

  <div   class="box-content  p-8 bg-white shadow-lg shadow-gray-300/50 mt-8 ml-5 mr-5  rounded-lg">
    <p>เลือกช่วงเวลาที่ต้องการ</p>
    <div>
    <form>
      <label for="dateInput">เลือกวันที่:</label>
      <input type="date" v-model="selectedDate">
      <button type="button" @click="getDateDetails">แสดงรายละเอียด</button>
    </form>

    <p v-if="resultdate !== ''" v-html="resultdate"></p>
  </div>




  </div>
 
  <div class="box-content  p-8 bg-white shadow-lg shadow-gray-300/50 mt-8 ml-5 mr-5  rounded-lg">
     <div class="card-body">
          <form @submit.prevent="save">
            <div class="form-group">
              <label>sugarValue</label>
              <input type="text" v-model="mysugar.sugarValue" class="form-control" placeholder="sugarValue">
            </div>
            <div class="form-group">
              <label>symptom</label>
              <input type="text" v-model="mysugar.symptom" class="form-control" placeholder="symptom">
            </div>
            <div class="form-group">
              <label>note</label>
              <input type="text" v-model="mysugar.note" class="form-control" placeholder="note">
            </div>
            <button  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Save</button>
          </form>
        </div>
  </div>

  </div>

<div>

    <div class="box-content  p-8 bg-white shadow-lg shadow-gray-300/50 mt-8 ml-5 mr-5 mb-10  rounded-lg">
  <div class="col-md-8">
        <h2>mysugar</h2>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Sugar Value</th>
              <th scope="col">Symptom</th>
              <th scope="col">Note</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sugarRecord in result" :key="sugarRecord.id">
              <td>{{ sugarRecord.sugarValue }}</td>
              <td>{{ sugarRecord.symptom }}</td>
              <td>{{ sugarRecord.note }}</td>
               <td>{{ moment(sugarRecord.created_at).format("DD MMM YYYY, HH:mm")}}</td>
               <td> ------------ </td>
                <td>{{ moment(sugarRecord.updated_at).format("DD MMM YYYY, HH:mm")  }}</td>
              <td>
                <button type="button" class="btn btn-warning" @click="edit(sugarRecord)">Edit</button>
                <button type="button" class="btn btn-danger" @click="remove(sugarRecord)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>

  </div>
               
    </Layout>


</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,700;1,300;1,400;1,500;1,600&display=swap');
</style>