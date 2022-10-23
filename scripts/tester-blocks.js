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
                    eval("global.testers.effectTesterFx = new Effect(" + this.effLength + ", e => {try{" + this.message + "}catch(er){Draw.color(Pal.remove); Lines.stroke(e.fout() * 5); Lines.circle(e.x, e.y, e.fin(Interp.pow10Out) * 30); global.testers.error = er}})")
                    global.testers.effectTesterFx.at(this.x, this.y)
                }catch(err){
                    global.testers.error = err
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
