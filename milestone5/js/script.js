const {createApp} = Vue;

createApp({

  data(){
    return{

      pathImg: '../assets/img/avatar',
      activeChat: 0,
      newMessage: '',
      search: '',
      isWritingText : false,
     
      user: {
        name: 'Riccardo',
        avatar: '_io'
      },

      contacts: [ 
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            } 
          ]
        },

        {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            }, 
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            }, 
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            } 
          ]
        }, 

        {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            }, 
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            }, 
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            } 
          ]
        }, 
        
        {
          name: 'Alessandro B.',
          avatar: '_4',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            } 
          ]
        }, 

        {
          name: 'Alessandro L.',
          avatar: '_5',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ]
        },

        {
          name: 'Claudia',
          avatar: '_6',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ]
        },

        {
          name: 'Federico',
          avatar: '_7',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ]
        },

        {
          name: 'Davide',
          avatar: '_8',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ]
        }
      ]  
    }
  },

  methods:{
    
    addNewMessage() {
      
      const message = {
        date: this.dateNow(),
        message: this.newMessage,
        status: 'sent'
      }

      this.contacts[this.activeChat].messages.push(message);

      this.newMessage ='';

      this.addFirstChat();

      setTimeout(this.autoScroll, 100);

      setTimeout(this.isWriting, 1000);

      setTimeout(() => {

        this.contacts[this.activeChat].isWritingMessage = true;

      }, 1000)

      setTimeout(this.addReply, 4000);

    },

    addFirstChat() {

      const newContact = this.contacts[this.activeChat];

      this.contacts.splice(this.activeChat, 1);

      this.activeChat = 0;

      this.contacts.unshift(newContact);

    },

    isWriting() {
      this.isWritingText = !this.isWritingText
    },

    addReply(){
      const message = {
        date: this.dateNow(),
        message: 'ok',
        status: 'received'
      }
      
      this.isWriting();

      this.contacts[this.activeChat].isWritingMessage = false;

      this.contacts[this.activeChat].messages.push(message);
    
      setTimeout(this.autoScroll, 100);
      
    },

    dateNow() {
      const DateTime = luxon.DateTime;
      
      const now = DateTime.now().toFormat("dd'/'LL'/'y' 'HH':'mm':'ss");

      return now;
    },

    showOptions(index) {

      const message = this.contacts[this.activeChat].messages[index];

      if(!message.isHidden) message.isHidden = 'show';
      else if(message.isHidden === 'hide') message.isHidden = 'show';
      else message.isHidden = 'hide';
      
      this.contacts.forEach(contact => {

        contact.messages.forEach(mess => {

          if(!mess.isHidden)  {
            
            mess.isHidden =  'hide';

          }
          else if(mess.isHidden === 'show') {
            
            mess.isHidden = 'hide';

            if( message.isHidden ='show') message.isHidden ='show';
           
          } 

        })

      })

    },

    hideAll() {

      this.contacts.forEach(contact => {

        contact.messages.forEach(mess => {

          if(!mess.isHidden)  {
            
            mess.isHidden =  'hide';

          }
          else if(mess.isHidden === 'show') {
            
            mess.isHidden = 'hide';
          
          }
        
        })
      
      })    

    },

    autoScroll() {
      const el = document.querySelector('.main-chat');
      
      el.scrollTop = el.scrollHeight;
     
    },

    showLastAccess() {

      let showDateMessage = this.contacts[this.activeChat].lastAccess; 

      this.contacts[this.activeChat].messages.forEach(message => {
        
        if(message.status === 'received') {
   
          showDateMessage = this.getDateMessage(message.date);
  
          this.contacts[this.activeChat].lastAccess = showDateMessage;
  
        } 
  
      })

      return showDateMessage;
      
    },




    getDateMessage(string){

      const dateString = 'Ultimo accesso: ' + string.substring(0,10) + ' alle ' + string.substring(11,16);

      return dateString;
    },

    openChat() {
      
      const newArrayMessage = [];

      let newIndex, newContact;

      this.contacts.forEach((contact, index) => {

        if(contact.name.toLowerCase().includes(this.search.toLowerCase())) {

          newArrayMessage.push(contact);

          newIndex = index;

        }

      })

      if(newArrayMessage.length === 1) {

        this.search = '';

        newContact = this.contacts[newIndex];

        this.contacts.splice(newIndex, 1);

        this.contacts.unshift(newContact);

        this.activeChat = 0;

      }

    }

  },

  mounted(){

    this.contacts[this.activeChat].messages.forEach(message => {
        
      if(message.status === 'received') {

        this.contacts[this.activeChat].lastAccess = this.getDateMessage(message.date);

      }

    })
    
  }

}).mount('#app');