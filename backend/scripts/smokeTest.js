import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function smokeTest() {
  const results = [];

  try {
    const health = await axios.get(`${API_URL}/health`);
    results.push({ name: 'Health check', ok: health.data?.success === true });
  } catch (error) {
    results.push({ name: 'Health check', ok: false, error: error.message });
  }

  try {
    const login = await axios.post(
      `${API_URL}/auth/student/login`,
      { username: 'student6', password: 'Student@123' },
      { withCredentials: true, validateStatus: () => true }
    );
    results.push({ name: 'Student login', ok: login.status === 200 && login.data?.success === true });
  } catch (error) {
    results.push({ name: 'Student login', ok: false, error: error.message });
  }

  const passed = results.filter((result) => result.ok).length;
  console.log(JSON.stringify({ passed, total: results.length, results }, null, 2));
  process.exit(passed === results.length ? 0 : 1);
}

smokeTest();
