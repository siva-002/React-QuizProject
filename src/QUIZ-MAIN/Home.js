import React, { useEffect, useState } from 'react'
import "./Home.css"
const Home = () => {

    const [questionnumber,setquestionnumber]=useState(1)
    const [minute,setminute]=useState(0)
    const [seconds,setseconds]=useState(0)
    const [start,setstart]=useState(false)
    const [click,setclick]=useState(false)
    const [mark,setmark]=useState(0)
    const [answers,setanswers]=useState([])
    const [questions,setquestions]=useState([
         {"id":1,"question":" Father of Our Nation","option":["Mahatma","Nehru","Kamarajar","Narendra Modi"],"answer":"0"},
         {"id":2,"question":" Capital Of Tamilnadu","option":["Chennai","Madurai","Trichy","Coimbatore"],"answer":"0"},
         {"id":3,"question":" Capital of Japan","option":["Netherland","China","Tokyo","Sweden"],"answer":"2"},
         {"id":4,"question":" First Prime Minister of India","option":["pradeepa patel","Abdul Kalam","Mahatma Gandhi","Jawaharlal nehru"],"answer":"3"},
         {"id":5,"question":" Republic Day of India","option":["January 25","January 26","August 25","August 15"],"answer":"1"},
        
        
        ])
    
      //Enable and disable next previous button
    useEffect(()=>{
      if(start){
      const prev= document.querySelector('.prev-btn')
      const next= document.querySelector('.next-btn')
      questionnumber<=answers.length+1 || answers.length==""?prev.setAttribute('disabled',true):prev.removeAttribute('disabled')
      questionnumber>=questions.length || answers.length<questionnumber?next.setAttribute('disabled',true):next.removeAttribute('disabled')
      }
    },[click])
    
    const prevbtn =()=>{
      setclick(!click)
        setquestionnumber((questionnumber)=>
        questionnumber>1?
        Number(questionnumber)-1:questions.length)
       // console.log(questionnumber)
    }
    const nextbtn =()=>{
      setclick(!click)
        setquestionnumber((questionnumber)=>
        questionnumber<questions.length?
       Number(questionnumber)+1:1)
      //  console.log(questionnumber)
    }
    useEffect(()=>{
      if(start){
      const li=document.querySelectorAll("li")
  
      li.forEach(el=>{
       el.addEventListener('click',checkans)
      
      })
    }
  
},[start,questionnumber])
  
   
   
    const disable=()=>{
      const li=document.querySelectorAll("li")
      li.forEach(el=>{
        el.removeEventListener('click',checkans)
       })
    }
    const checkans=(e)=>{
   
      const val=e.target.id
      const obj={"q":questionnumber,"ans":val}
      setanswers([...answers,obj])
      setclick(!click)
      questions.filter(q=>(q.id==questionnumber)).filter(q=>q.option[q.answer]==val?(       
        e.target.classList.add('correct'),
        setmark(mark+1),
        disable()
         
      ):(
        e.target.classList.add('wrong') ,
        disable()  
      
      )
       
      )    
  
}
//End Quiz
useEffect(()=>{
  if(answers.length==questions.length){
      setTimeout(()=>( 
        alert("Quiz Finished"),
        setstart(false)),2000)
     
    
  }
  

},[answers])

//timer

useEffect(()=>{
 if(answers.length!=questions.length && start==true){
  const timer= setInterval(()=>(
       seconds==59?(
        setminute(min=>min+1),
        setseconds(0)
       
       ):
       (
        setseconds(sec=>sec+1)
       
       )
  ),1000)
  
    return(()=>clearInterval(timer))
       }
},[seconds,start])
 

  return (
    <div className='quiz-app'>
        <div className='quiz-body'>
            <h3>Quiz</h3>
            {start ?(
            <div className='quiz-con'>
                <div className='quiz-id'><span  >{minute<10?'0'+minute:minute}</span> : <span >{seconds<10?'0'+seconds:seconds}</span></div>
                <div className='quiz-mark'>Points {mark}</div>
                    <div className='quiz-question'>
                        <h4>{
                          questions.filter(quest=>quest.id==questionnumber).map(q=>q.question)
                            }</h4>
                    </div>
                    <div className='quiz-option'>
                    <ul >
                      { questions.filter(quest=>quest.id==questionnumber).map(q=>(
                            <>
                              <li  id={q.option[0]} key={q.option[0]} >  {q.option[0]}</li>
                              <li id={q.option[1]} key={q.option[1]}  > {q.option[1]}</li>
                              <li id={q.option[2]} key={q.option[2]} > {q.option[2]}</li>
                              <li id={q.option[3]} key={q.option[3]}  > {q.option[3]}</li>
                              
                            </>
                      
                      ))
                    
            } </ul>          
                    </div>

            <div className='quiz-btn'>
                <button className='prev-btn' onClick={prevbtn} >Prev</button>
                <button className='next-btn' onClick={nextbtn}>Next</button>
            </div>

            <div className='question-indicator'> 
                {questions.map(el=>(
                  
                  <div id={el.id} style={{backgroundColor:questionnumber==el.id?"yellow":"",color:questionnumber==el.id?"black":""}}>{el.id}</div>
                ))}
            </div>
            </div>):(
              questions.length==answers.length?(
                  <div className='report'>
                      <h2 className='quiz-res' > RESULT</h2>
                          <table>
                          
                            <tr><th>Total no of questions  </th><td>{questions.length}</td></tr>
                            <tr><th>Correct </th><td>{mark}</td></tr>
                            <tr><th>InCorrect  </th><td>{questions.length-mark}</td></tr>
                            <tr><th>Time Taken</th><td>{minute} Minutes and {seconds} Seconds</td></tr>
                            <tr><th>Total Marks </th><td>{mark*20}</td></tr>
                          </table>
                  </div>):
              <button className='start-btn' onClick={()=>setstart(true)}>Start</button>
            )}
        </div>
      
    </div>
  )
}

export default Home