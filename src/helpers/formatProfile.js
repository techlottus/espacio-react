import { capitalize, formatString } from "./formatString";

export const formatProfile = (profile) => {
  return {
    name: capitalize(profile.fullName),
    items: [
      formatString(profile.enrollmentNumber),
      formatString(profile.institute),
      formatString(profile.academicLevel),
      formatString(profile.program),
    ],
  };
};
