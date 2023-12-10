<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, computed, onMounted, onUnmounted } from "vue";
import Layout from '../layouts/Layout.vue';
import moment from "moment";


/* แสดงเวลาแบบ real time  */
const currentTime = ref('');
const updateCurrentTime = () => {
  currentTime.value = moment().format("DD MMM YYYY, HH:mm");
};
// ใช้ onMounted เพื่อเรียกใช้ฟังก์ชันเมื่อ Component ถูก Mount
onMounted(() => {
  // เริ่มต้นใช้งาน real-time update โดยเรียกฟังก์ชันทุกๆ 1 วินาที
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
});
// ใช้ onUnmounted เพื่อทำความสะอาดเมื่อ Component ถูก Unmount
onUnmounted(() => {
  // ยกเลิกการใช้งาน setInterval เมื่อ Component ถูก Unmount เพื่อป้องกัน memory leak
  clearInterval(updateCurrentTime);
});



/* แสดงค่าน้ำตาล */
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

const router = useRouter();
const saveData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/mysugar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mysugar.value),
    });
    if (response.ok) {
      alert('Saved');
      await MysugarLoad();
      // mysugar.value.id = '';
      // mysugar.value.sugarValue = '';
      // mysugar.value.symptom = '';
      // mysugar.value.note = '';

      // ทำการนำทางไปยังหน้า SugarValue
      navigateToSugarValue(mysugar.value.sugarValue);
      

    } else {
      throw new Error('Failed to save');
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// ทำการนำทางไปยังหน้า SugarValue

const navigateToSugarValue = (sugarValue) => {
  router.push({
    path: '/sugar-value',
    query: {
      sugarValue: sugarValue,
    },
  });
  // console.log('เข้า');
  // console.log(sugarValue);

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

<template >
  <Layout class="bg-gradient-to-b from-blue-100 ">
    <!-- content -->
    <div class="container mx-auto ">

      <div
        class="box-content p-3  ml-5 mr-5 mt-10 bg-gradient-to-b from-blue-900 to-blue-800  shadow-lg shadow-slate-500/50  rounded-lg">
        <h2 class="font-semibold text-xl text-center text-slate-200 ">หน้าหลัก</h2>
      </div>

      <div class="grid grid-cols-2 gap-2  mt-8  ">

        <div class="box-content  p-8 bg-slate-100 shadow-lg shadow-gray-300/50 mt-8 ml-5 mr-5  rounded-lg">
          <p>ยาอินซูลินที่แพทย์กำหนด</p>
          <p>------------</p>
        </div>

        <div class="box-content   p-8 bg-slate-100 shadow-lg shadow-gray-300/50 mt-8 ml-5 mr-5  rounded-lg  ">
          <p>เวลาปัจจุบัน: {{ currentTime }}</p>
        </div>



      </div>

      <div>

        <div class="box-content   bg-slate-100 shadow-lg shadow-gray-300/50 mt-8 ml-5 mr-5  rounded-lg ">
          <form @submit.prevent="save">

            <div class="box-content ml-10 mr-10 ">
              <p>น้ำตาลในเลือด (mg/dL) *</p>
              <div class="box-content">
                <input type="text" v-model="mysugar.sugarValue" class="form-control"
                  placeholder="กรอกเฉพาะตัวเลข เช่น 260 ">
              </div>
            </div>


            <div class="box-content  ml-8 mr-10">
              <p>อาการผิดปกติ (ถ้ามี)</p>
              <input type="text" v-model="mysugar.symptom" class="form-control box-content p-10 w-10/12  mr-15"
                placeholder="กรุณากรอกข้อมูลเมื่อพบอาการผิดปกติ">
            </div>



            <div class="box-content  ml-10 mr-10">
              <p>อื่นๆ</p>
              <div class="box-content">
                <input type="text" v-model="mysugar.note" class="form-control"
                  placeholder="กรุณากรอกข้อมูลอื่นๆที่อยากบอกเรา เช่น เมื่อคืนรับประทานอะไรไปบ้าง ">
              </div>
            </div>




            <div class="box-content ">
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </Layout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,700;1,300;1,400;1,500;1,600&display=swap');
</style>