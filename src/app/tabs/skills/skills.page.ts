import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {

  mockSkill = [{title:"Stressball",like:true},
                {title:"Meditation",like:false}];

  //public diaryEntry: Array<String> = []; 
  public dataArray; 

  constructor(public storage: Storage,) {
    this.dataArray = [{title:"Stressball",imgurl:"assets\\globe_stress_ball.jpg",content:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "},
                      {title:"Hitzearmband",imgurl:"assets\\sinn_armband.jpg",content:"<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>"+
                      "<ul><li>Sed diam nonumy eirmod tempor invidunt ut labore. </li>"+
                          "<li>Et dolore magna aliquyam erat, sed diam voluptua. </li></ul>"
                        },
                        {title:"Meditation",imgurl:"assets\\meditation.jpg",content:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "}
                      ];
   }

  async ngOnInit() {
    //debugger;
    //this.set("001",this.mockSkill[0]);
    //this.set("002",this.mockSkill[1]);
    //this.clear();
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("skill")){
          //this.diaryEntry.push(v);
      }
    });
  }
  
  getIcon(entry){
    if(entry.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }

  
  public set(skill,value){
    return this.storage.set(`skill:${ skill }`,value);
  }
  public async get(skill){
    return await this.storage.get(`skill:${ skill }`);
  }
  public async remove(skill){
    return await this.storage.remove(`skill:${ skill }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }
  

}
