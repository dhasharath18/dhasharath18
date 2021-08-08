import { Component, OnInit,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import { interval } from 'rxjs';
import {ChatService} from '../../providers/chat.service';
import {UtilsService} from '../../providers/utils.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  headerData = { title: 'Chat', year_id: 0 };
  @ViewChild('content') content: any;
  public usermessages:Array<any>=[]
  public sendermessages:Array<any>=[]
  message: string;
  public chatData;
  lastId: any;
  userid: any;
  pages: any;
  public msgLoader;
  constructor(
     private chatService: ChatService,
    private router: Router,
    private utils: UtilsService,
    private storage: Storage) { }

  ngOnInit() {
    this.exploreChat();
    setTimeout(() => {  if(this.content._scroll) this.content.scrollToBottom(300);}, 3000);

  }
  ionViewDidLeave() {
    this.msgLoader.unsubscribe();
   }
  unescape(text){ 
    var entities = [
      ['amp', '&'],
      ['apos', '\''],
      ['#x27', '\''],
      ['#x2F', '/'],
      ['#39', '\''],
      ['#47', '/'],
      ['lt', '<'],
      ['gt', '>'],
      ['nbsp', ' '],
      ['quot', '"']
    ];
    
    for (var i = 0, max = entities.length; i < max; ++i) 
      text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
    return text;
    }

  exploreChat() {
    this.utils.loadingPresent()
    this.storage.get('userid').then((id) => {
      this.msgLoader =interval(1000).subscribe((value) => {
        let chatObj = {
          userid: id,
          lid: this.lastId
        }
        this.chatService.chatData(chatObj).subscribe((result) => {
          this.utils.loadingDismiss()
          if (result) {
            if (this.chatData) {
              this.chatData = this.chatData.concat(result.data);
            } else {
              this.chatData = result.data;
            }
            this.lastId = this.chatData[this.chatData.length - 1].id;
          }
        })
      })
    })
  }

  sendMsg() {
    if(this.content._scroll) this.content.scrollToBottom(300); 
    this.storage.get('userid').then((id) => {
      let msgData = {
        userid: id,
        message: this.message
      }
      this.chatService.postMessage(msgData).subscribe((data) => {
      setTimeout(() => { this.content.scrollToBottom(300); }, 800);
      })
      this.message = "";
    })

  }


}
