module.exports = {
  type: 'Screen',
  options: {
    title: 'Пользователи',
    reference: '/me',
  },
  blocks: [
    {
      type: 'Pages/DefaultPageWithList',
      options: { title: 'Мой профиль' },
      slots: {
        headingAction: {
          type: 'Actions/Button',
          options: { name: 'Редактировать', icon: 'edit', type: 'SECONDARY' },
          actions: {
            click: [
              {
                type: 'api:request',
                options: {
                  reference: '/users/profile',
                  method: 'get',
                  saveToContext: 'screen:temp-data.currentUser',
                },
              },
              {
                type: 'open-modal',
                options: { name: 'edit-my-profile' },
              },
            ],
          },
        },
        mainContent: {
          type: 'UserProfile',
          dataSource: {
            type: 'context',
            options: {
              key: 'global:currentUser',
            },
          },
        },
      },
      modals: {
        'edit-my-profile': {
          title: 'Редактирование профиля',
          block: {
            type: 'RowFields/FieldsList',
            options: {
              mode: 'vertical',
              fields: [
                {
                  type: 'edit:Avatar',
                  options: {
                    imageOptions: {
                      aspectRatio: 1,
                      contextPath: 'screen:temp-data.currentUser.image',
                    },
                    actions: {
                      upload: {
                        type: 'api:uploadFile',
                        options: {
                          reference: '/file_storage/store',
                        },
                      },
                    },
                  },
                },
                {
                  type: 'edit:Text',
                  options: {
                    inputOptions: {
                      width: 'full-width',
                      size: 'large',
                      placeholder: 'Имя',
                      contextPath: 'screen:temp-data.currentUser.firstName',
                    },
                    actions: {
                      change: {
                        type: 'update-context',
                        options: {
                          context: 'screen:temp-data.currentUser.firstName',
                        },
                      },
                    },
                  },
                },
                {
                  type: 'edit:Text',
                  options: {
                    inputOptions: {
                      width: 'full-width',
                      size: 'large',
                      placeholder: 'Фамилия',
                      contextPath: 'screen:temp-data.currentUser.surname',
                    },
                    actions: {
                      change: {
                        type: 'update-context',
                        options: {
                          context: 'screen:temp-data.currentUser.surname',
                        },
                      },
                    },
                  },
                },
                {
                  type: 'edit:Text',
                  options: {
                    inputOptions: {
                      width: 'full-width',
                      size: 'large',
                      placeholder: 'Должность',
                      contextPath: 'screen:temp-data.currentUser.postName',
                    },
                    actions: {
                      change: {
                        type: 'update-context',
                        options: {
                          context: 'screen:temp-data.currentUser.postName',
                        },
                      },
                    },
                  },
                },
                {
                  type: 'edit:Text',
                  options: {
                    inputOptions: {
                      width: 'full-width',
                      size: 'large',
                      placeholder: 'E-mail',
                      contextPath: 'screen:temp-data.currentUser.email',
                    },
                    actions: {
                      change: {
                        type: 'update-context',
                        options: {
                          context: 'screen:temp-data.currentUser.email',
                        },
                      },
                    },
                  },
                },
                {
                  type: 'edit:Checkbox',
                  options: {
                    checkboxOptions: {
                      width: 'full-width',
                      size: 'large',
                      text: 'Заблокировать',
                      contextPath: 'screen:temp-data.currentUser.blocked',
                    },
                    actions: {
                      change: {
                        type: 'update-context',
                        options: {
                          context: 'screen:temp-data.currentUser.blocked',
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          actionBlock: {
            type: 'Actions/Button',
            options: { name: 'Сохранить', size: 'LARGE' },
            actions: {
              click: [
                {
                  type: 'api:request',
                  options: {
                    reference: '/users/update',
                    method: 'post',
                    body: {
                      id: '=screen:temp-data.currentUser.id',
                      name: '=screen:temp-data.currentUser.firstName',
                      surname: '=screen:temp-data.currentUser.surname',
                      email: '=screen:temp-data.currentUser.email',
                      position: '=screen:temp-data.currentUser.postName',
                      imageId: '=screen:temp-data.currentUser.image.id',
                      blocked: '=screen:temp-data.currentUser.blocked',
                    },
                  },
                },
                {
                  type: 'close-modal',
                },
                {
                  type: 'api:request',
                  options: {
                    reference: '/users/profile',
                    method: 'get',
                    saveToContext: 'global:currentUser',
                  },
                },
              ],
            },
          },
        },
      },
    },
  ],
};
