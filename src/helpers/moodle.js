import env from "../enviroment/environment";
import { getTokenMoodleHttp } from "../services/moodle/MoodleService";

export const moodleRedirect = async() => {
    try {
      const { data } = await getTokenMoodleHttp();
      const { id } = data
      return `${env.moodleRedirect}?key=${id}`
    } catch (e) {
      throw e;
    }
  };