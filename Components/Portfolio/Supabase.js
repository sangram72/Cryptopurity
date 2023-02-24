import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
const REACT_APP_SUPABASE_URL = 'https://fceipzvnhqotoasrxcwr.supabase.co';
const REACT_APP_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZWlwenZuaHFvdG9hc3J4Y3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3OTUzMDMsImV4cCI6MTk5MDM3MTMwM30.giz4DWuGE6eJ-jsWKCtBIiDh8wjTv-5ocfOocWo6B8k';

const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY);
export default supabase;
