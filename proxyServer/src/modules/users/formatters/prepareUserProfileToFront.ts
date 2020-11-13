import prepareUrl from 'libs/prepareUrl';

export default function({ user }) {
  if (!user.image) return;
  const imagePath = prepareUrl(user.image.path);

  user.firstName = user.name;
  user.blocked = !user.active;
  user.avatar = imagePath;
  user.image = { ...user.image, path: imagePath };
  user.name = `${user.name} ${user.surname}`;
  user.postName = user.position;
  user.customFields = [
    { title: 'Должность', type: 'text', options: { value: user.postName } },
  ];

  return user;
}
