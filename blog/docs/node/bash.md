---
title: Bash 脚本编程
---

# Bash 脚本编程

## 1. 基本结构

一个基本的 Bash 脚本 `#!/bin/bash` 开头，告诉系统使用 Bash 来执行该脚本。

```bash
#!/bin/bash

# 这是注释，不会被执行
echo "Hello，World!"
```

## 2. 脚本执行

要执行 Bash 脚本，需要给它执行权限，然后直接运行它

```bash
chmod +x my_script.sh
./my_script.sh
```

## 3. 基本语法

-   命令和管道
    在 Bash 中，命令是执行任务的基本单元。命令之间可以通过管道（`|`）连接，使一个命令的输出成为另一个命令的输出。

```bash
# 命令示例
ls -l
# 管道示例，列出当前目录下的文件，并通过grep搜索包含.txt的行
ls -l | grep ".txt"
```

-   变量

```bash
# 定义变量
my_name="Hello"

# 使用变量
echo $my_name

# 使用带有引号的变量
echo "${my_name} World"
echo "${my_variable^^}" # 将变量转换为大写 V4.0以后版本支持
echo "${my_variable,,}" # 将变量转换为小写 V4.0以后版本支持
```

-   条件语句

```bash
# if语句示例
if [ $my_name = "Hello" ]; then
    echo "name is 'Hello'"
else
    echo "name is not 'Hello'"
fi

```

-   循环

```bash
# for循环示例
for i in {1...5}; do
    echo "Loop iteration: $i"
done

# while循环示例
count=1
while [ $count - le 5]; do
    echo "Count is: $count"
    ((count++))
done
```

-   函数

```bash
# 使用function关键字
function my_function {
    echo "This is a function"
}

# 使用简单的命名约定
my_function() {
    echo "$0 是这个函数本身"
    echo "The first arguments is $1"
    echo "The second arguments is $2"
}

# 调用函数
my_function "hello" "world"
```

-   函数返回值
    函数可以使用 `return` 命令返回一个值。

```bash
# 定义返回值的函数
my_function() {
    local my_value="Some value"
    return $((42))
}

# 调用函数并获取返回值
my_function
echo "Return value: $?"
```

这里，`$?`将包含有 `my_function` 函数返回的退出状态码。

## 4. 用户交互

-   读取输入

    在脚本中，可以使用 `read` 命令从用户那里读取输入

```bash
# 读取用户输入
read -p "Enter your name: " name
echo "Hello, $name!"
```

## 5.模块化脚本

创建模块文件 `my_module.sh`

```bash
function my_function {
    echo "This function is in a module"
}
```

在主脚本中使用模块 `main_script.sh`

```bash
# main_script.sh
source my_module.sh

# 现在可以调用模块中的函数
my_function
```

## 6.脚本优化

-   简化命令

```bash
# 不必要的命令
ls -l
grep "txt"

# 优化后的命令
ls -l ｜ grep "txt"
```

-   使用别名和函数

```bash
# 创建别名
alias ll='ls -l'

# 创建函数
function list_files() {
    ls -l $1
}

# 使用别名和函数
ll
list_files /path/to/directory
```
