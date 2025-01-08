const express=require('express')
const router=express.Router();

const courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
]
//get request
router.get('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send("The course not found of this id");
    }
    else{
        res.send(course)
    }
})

//post method

router.post('/',(req,res)=>{
    const schema={
        name:Joi.string().min(3).required()
    }
    //const result = Joi.ValidationError(req.body,schema)
    // if(result.error){
    //     res.status(400).send(result.error)
    // }
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send("name is required and should mininum greater then 3");
        return 
    }  
    const course={id:courses.length+1,name:req.body.name}
    courses.push(course);
    res.send(course)
})


//put method

router.put('/:id',(req,res)=>{
    //lookup the course
    //If  not exist
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
       return  res.status(404).send("The course not found of this id");
    }

    //validate
    //if invalid return 400
    //return update the course
    course.name=req.body.name;
    res.send(course)
})

//delete method

router.delete('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
       return res.status(404).send("The course not found of this id");
    }
    const index=courses.indexOf(course)
    courses.splice(index,1);
    res.send("deleted")
})

module.exports=router