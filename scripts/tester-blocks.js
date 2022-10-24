//Global tester variable.
//Used for eval calls.
global.testers = {
    effectTesterFx: Effect(20, e => {}),
    error: null
}

//Effect tester.
const effectTester = extend(MessageBlock, "effect-tester", {})

//Effect tester build. Contains building code.
effectTester.buildType = () => {
    const build = extend(MessageBlock.MessageBuild, effectTester, {
        
        effLength: 20,
        
        buildConfiguration(table){
            this.super$buildConfiguration(table)
            table.button(Icon.star, Styles.cleari, () => {
                try{
                    eval("global.testers.effectTesterFx = new Effect(" + this.effLength + ", e => {try{" + this.message + "}catch(er){Draw.color(Pal.remove); Lines.stroke(e.fout() * 5); Lines.circle(e.x, e.y, e.fin(Interp.pow10Out) * 30); Fonts.def.draw(er.toString(), e.x, e.y + e.fin(Interp.pow3Out) * 15, Color.white, 0.24, false, 1)}})")
                    global.testers.effectTesterFx.at(this.x, this.y)
                }catch(err){
                    Vars.ui.showError(err.toString())
                }
            }).size(40)
            
            table.slider(1, 120, 1, this.effLength, a => {
                this.effLength = a
            }).get().setWidth(125)
        },
        
        write(write){
            this.super$write(write)
            write.f(this.effLength)
        },
        
        read(read, rev){
            this.super$read(read, rev)
            this.effLength = read.f()
        }
        
    })
    return build
}


const scriptTester = extend(MessageBlock, "script-tester", {})

scriptTester.buildType = () => {
    const build = extend(MessageBlock.MessageBuild, scriptTester, {
        
        strCont: "",
        errored: false,
        
        buildConfiguration(table){
            this.super$buildConfiguration(table)
            table.button(Icon.wrench, Styles.cleari, () => {
                try{
                    if(this.strCont == this.message && this.errored) return
                    this.strCont = this.message
                    eval(this.message)
                    this.errored = false
                }catch(err){
                    Vars.ui.showError(err.toString())
                    this.errored = true
                }
            })
        },
        
       write(write) {
           this.super$write(write)
           write.str(this.strCont)
           write.b(this.errored)
       },

       read(read, rev) {
           this.super$read(read, rev)
           this.strCont = read.str()
           this.errored = read.b()
       }
       
    })
}