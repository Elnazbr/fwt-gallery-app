const InputName = (props) => {
    return (
        <div className="col-3 col-sm-12">
          <input type="text" className="filter-name" placeholder="Name" onChange={props.onChangeText} />
        </div>
    )
}

export default InputName;