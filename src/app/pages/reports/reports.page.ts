import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../providers/report.service';
import {UtilsService} from '../../providers/utils.service';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  exams;
  examdata;
  studentdetail;
  subjectlist;
  maxmarks;
  gradeList;
  exammarks;
  pages;
  text
  headerData={ title:'Reports', year_id:0};
  examlist:Array<any>=[];
  showsubject:boolean=false;

  constructor(
    private storage: Storage,
    public reportService: ReportService,
    public utils: UtilsService,
   ) { }

    ngOnInit() {
     
      this.getReports();
    }

  getReports() {
    this.utils.loadingPresent();
    this.storage.get('userid').then((uid) => {
      this.storage.get('academic_id').then((aid) => {
        let Obj = {
          userid: uid,
          activeAY: aid
        }
        return this.reportService.getReports(Obj).subscribe((result) => {
          this.utils.loadingDismiss();
          if (result.student) {
            this.studentdetail=result.student;
            this.examdata = result.exams;
          }else{
            this.text="No Data Found"
          }
        })
      });
    })
  }

  getFixed(v) {
    console.log
    v = parseFloat(v.toFixed(2));
    return v;
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
}
