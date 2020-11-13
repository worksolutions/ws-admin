import { assoc } from 'ramda';
import prepareUrl from 'libs/prepareUrl';
import { UserInterface } from 'types/users';

export default function({
  user: { active, ...userData },
}: {
  user: UserInterface;
}) {
  const user = { ...userData, blocked: !active };
  if (!user.image) return { user };
  return {
    user: assoc(
      'image',
      assoc('path', prepareUrl(user.image.path), user.image),
      user,
    ),
  };
}
