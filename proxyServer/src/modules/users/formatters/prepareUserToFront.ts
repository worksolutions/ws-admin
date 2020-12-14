import { assoc } from "ramda";
import prepareUrl from "libs/prepareUrl";
import { UserInterface } from "types/users";

export default function ({ user: { active, ...userData } }: { user: UserInterface }) {
  const user = { ...userData, blocked: !active };
  if (!user.image) return user;
  const url = prepareUrl(user.image.path);

  return {
    ...user,
    image: assoc("path", url, user.image),
    avatar: url,
  };
}
