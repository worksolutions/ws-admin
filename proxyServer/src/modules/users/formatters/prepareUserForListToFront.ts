import prepareUrl from "libs/prepareUrl";

export default function(user) {
  return {
    code: user.id,
    title: user.name + " " + user.surname,
    leftContent: user.image ? prepareUrl(user.image.path) : null,
    subTitle: `${user.position} • ${user.email}`,
    blocked: !user.active,
  };
}
