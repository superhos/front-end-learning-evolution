// 给空的文件夹增加一个占位文件
const fs = require('fs')
const path = require('path')

const ignore = [
    '.git'
]

function checkFolder (fdPath) {
    const stack = [fdPath]
    while (stack.length > 0) {
        const f = stack.pop()
        const fstat = fs.statSync(f)
        if (fstat.isDirectory() && !ignore.includes(path.basename(f))) {
            const child = fs.readdirSync(f)
            if (child.length === 0) {
                addTempFile(f)
            } else {
                stack.push(...child.map(e => path.resolve(f, e)))
            }
        }
    }
}

function addTempFile (fdPath) {
    fs.writeFileSync(fdPath + '/README.md', '## 占位')
}

checkFolder('./')