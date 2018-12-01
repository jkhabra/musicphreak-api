import { Pool } from 'pg';

const pool = new Pool({ connectionString: "postgresql://jatinder:birdsdofly@localhost:5432/musicphreak" });

export default pool;
