<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import Layout from '../layouts/Layout.vue';
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
      mysugar.value.sugarValue = '';
      mysugar.value.symptom = '';
      mysugar.value.note = '';
      mysugar.value.id = '';
    } else {
      throw new Error('Failed to update');
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

const remove = async (record) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}api/mysugar/${record.id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.ok) {
      alert('Deleted');
      await MysugarLoad();
    } else {
      throw new Error('Failed to delete');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

MysugarLoad();
</script>

<template>

 <Layout>
         <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>
<!-- content -->
<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="text-center text-dark mt-2">( Create Read Update and Delete)</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card-header">
          Add Record
        </div>
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
            <button type="submit" class="btn btn-primary bg-sky-500/100">Save</button>
          </form>
        </div>
      </div>


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
               
    </Layout>


</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,700;1,300;1,400;1,500;1,600&display=swap');
</style>