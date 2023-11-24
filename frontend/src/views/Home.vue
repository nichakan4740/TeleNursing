<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import Layout from '../layouts/Layout.vue';
const result = ref([]);

const MysugarLoad = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/mysugar`);
    const data = await response.json();
    result.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
MysugarLoad();
</script>
 <template>
    <Layout>
         <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">หน้าหลัก</h2>
        </template>
      <div class="container">
    <div class="row justify-content-center">      
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