//Variables declared before everything.
let effLength = 20


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
        
        buildConfiguration(table){
            this.super$buildConfiguration(table)
            table.button(Icon.star, Styles.cleari, () => {
                try{
                    Vars.mods.scripts.runConsole("global.testers.effectTesterFx = new Effect(" + effLength + ", e => {" + this.message + "})")
                    global.testers.effectTesterFx.at(this.x, this.y)
                }catch(err){
                    global.testers.error = err
                }
            }).size(40)
            
            table.slider(1, 120, effLength, a => {
                effLength = a
            }).get().setWidth(125)
            
        }
        
    })
    return build
}
